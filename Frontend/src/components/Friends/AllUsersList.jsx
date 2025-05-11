// components/User/AllUsersList.jsx
import styled from "styled-components";
import { useUsersAndFriends } from "../../Hooks/useUsersAndFriends";
import { UserCard } from "../User/UserCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  
`;



const AllUsersList = ({ onAddFriend, onRemoveFriend }) => {
  const {
    users,
    userId,
    isFriend,
    getFriendshipId,
    refreshFriends,
  } = useUsersAndFriends();

  return (
    <Container>
      {users
        .filter((u) => u.id !== userId)
        .map((user) => (
        
            <UserCard
            key={user.id}
            user={user}
            isFriend={isFriend(user.id)}
            friendshipId={getFriendshipId(user.id)}
            onAdd={async () => {
              if (onAddFriend) onAddFriend(user.id);
              await refreshFriends();
            }}
            onRemove={onRemoveFriend}
            
          />
         
          
        ))}
    </Container>
  );
};

export default AllUsersList;
