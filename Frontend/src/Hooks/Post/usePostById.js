import { useEffect, useState } from "react";
import { getPostById } from "../../api/Post/GetPostById";

export function usePostById(id, t) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const postData = await getPostById(id);
        setPost(postData);
      } catch (err) {
        console.error("Erro ao carregar post:", err);
        setError(t ? t("errorLoadingPost") : "Erro ao carregar post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id, t]);

  return { post, loading, error };
}
