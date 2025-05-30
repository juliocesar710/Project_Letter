const common = {
  borderRadius: {
    small: '5px',
    medium: '8px',
    large: '10px',
  },
  padding: {
    input: '12px 20px',
    button: '12px',
    container: '30px',
  },
  shadows: {
    light: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  fontSize: {
    small: '0.875rem',  // 14px
    base: '1rem',        // 16px
    medium: '1.25rem',   // 20px
    large: '1.5rem',     // 24px
    title: '2rem',       // 32px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  iconSize: {
    small: '16px',
    base: '24px',
    large: '32px',
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 600px)',
    tablet: 'only screen and (max-width: 900px)',
    desktop: 'only screen and (min-width: 901px)',
  },
};

export const lightTheme = {
  colors: {
    primary: '#a39e93',
    primaryDark: '#8c8579',
    secondary: '#cfcabf',
    background: '#f5f2ed',
    inputBackground: '#faf9f7',
    border: '#e0dcd5',
    borderFocus: '#a39e93',
    text: '#333',
    textLight: '#666',
    subtleText: '#999',
    accent: '#d49f66',
    accentDark: '#b38147',
    textContrast: '#fff',
    error: '#c17a7a',
    errorDark: '#a05252',
    success: '#88c099',
    successDark: '#6fa685',
  },
  ...common,
};

export const darkTheme = {
  colors: {
    primary: '#888888',
    primaryDark: '#6e6e6e',
    secondary: '#444444',
    background: '#1e1e1e',
    inputBackground: '#2b2b2b',
    border: '#3f3f3f',
    borderFocus: '#888888',
    text: '#e0e0e0',
    textLight: '#bbb',
    subtleText: '#b0b0b0',
    accent: '#d49f66',
    accentDark: '#b38147',
    textContrast: '#fff',
    error: '#cc6b6b',
    hover: '#333333',
    highlight: '#2e2e2e',
    success: '#4caf50',
    successDark: '#388e3c',
  },
  ...common,
};

/*...existing code...*/

export const greenTheme = {
  colors: {
    primary: '#7BAE7F',
    primaryDark: '#5F8C63',
    secondary: '#A9D2AC',
    background: '#F2F8F3',
    inputBackground: '#EAF3EA',
    border: '#C8DCC9',
    borderFocus: '#7BAE7F',
    text: '#2F3E34',
    textLight: '#4B5F50',
    subtleText: '#8BAA91',
    accent: '#4E8A59',
    accentDark: '#3C6E45',
    textContrast: '#ffffff',
    error: '#C17A7A',
    errorDark: '#A05252',
    success: '#6FBF73',
    successDark: '#4C9E52',
  },
  ...common,
};

export const redTheme = {
  colors: {
    primary: '#B85750',         
    primaryDark: '#97423C',     
    secondary: '#E8C1B9',       
    background: '#F9F4F2',      
    inputBackground: '#F3E7E4', 
    border: '#E0C6C0',          
    borderFocus: '#B85750',     
    text: '#3D1F1B',            
    textLight: '#6E4B46',       
    subtleText: '#A9827C',      
    accent: '#D4645C',          
    accentDark: '#B34C45',      
    textContrast: '#ffffff',    
    error: '#C04040',          
    errorDark: '#A03030',       
    success: '#88C099',         
    successDark: '#6FA685',     
  },
  ...common,
};

export const purpleTheme = {
  colors: {
    primary: '#7D5BA6',         // roxo médio elegante
    primaryDark: '#5F3E82',     // roxo profundo
    secondary: '#D8C4E0',       // lavanda suave
    background: '#F7F5FA',      // off-white frio
    inputBackground: '#EFE9F4', // lilás bem clarinho
    border: '#D1BFD9',          // cinza arroxeado
    borderFocus: '#7D5BA6',     // mesmo que primary
    text: '#3C2A4D',            // roxo escuro/cinza arroxeado
    textLight: '#6B567D',       // roxo acinzentado
    subtleText: '#A690B5',      // lilás suave
    accent: '#A259FF',          // roxo vibrante
    accentDark: '#8C3DFD',      // roxo mais forte
    textContrast: '#ffffff',    // branco puro
    error: '#C76BAF',           // magenta rosado
    errorDark: '#A3508C',       // magenta escuro
    success: '#88C099',         // mantém verde como cor padrão de sucesso
    successDark: '#6FA685',     // idem
  },
  ...common,
};


export const classicTheme = {
  colors: {
    primary: '#8B6B4A', // Um rico tom de bronze para a cor primária
    primaryDark: '#6B4E36', // Versão mais escura para profundidade
    secondary: '#D4B483', // Dourado claro para elementos secundários
    background: '#F8F4EF', // Fundo creme suave e elegante
    inputBackground: '#FFFDFA', // Branco levemente amarelado para inputs
    border: '#E0D6C2', // Borda suave com tom pergaminho
    borderFocus: '#A38B6D', // Borda em foco mais escura
    text: '#3A3226', // Texto principal em marrom escuro sofisticado
    textLight: '#6D5C48', // Texto mais claro mas ainda legível
    subtleText: '#9C8E7D', // Texto sutil para informações menos importantes
    accent: '#C77E23', // Laranja dourado vibrante para destaques
    accentDark: '#9D641A', // Versão mais escura do accent
    textContrast: '#FFF8EE', // Cor de contraste suave para texto em fundos escuros
    error: '#D47D7D', // Vermelho suave para erros
    errorDark: '#B05A5A', // Versão mais escura do erro
    success: '#7DBD8F', // Verde folha suave para sucesso
    successDark: '#5F9D71', // Versão mais escura do sucesso
  },
  ...common,
};

export const blueTheme = {
  colors: {
    primary: '#5A4FCF',           // Azul violeta vivo e sofisticado
    primaryDark: '#4336A5',       // Azul mais escuro e elegante
    secondary: '#F76C5E',         // Coral vibrante, moderno e acolhedor
    background: '#FAF8F5',        // Off-white sofisticado, ideal para leitura
    inputBackground: '#F0ECE7',   // Tom suave e aconchegante
    border: '#DDD8D3',            // Neutro e discreto
    borderFocus: '#5A4FCF',       // Mantemos coerência com o primário
    text: '#2E2A27',              // Quase preto, sofisticado e legível
    textLight: '#5C5550',         // Cinza quente para textos auxiliares
    subtleText: '#8A817C',        // Cinza amarronzado para textos sutis
    accent: '#F9A826',            // Amarelo queimado, sofisticado e vibrante
    accentDark: '#C47F00',        // Versão mais intensa do acento
    textContrast: '#FFFFFF',      // Branco puro para botões destacados
    error: '#D64550',             // Vermelho clássico, mas vivo e elegante
    errorDark: '#A32E39',         // Vermelho queimado para alertas
    success: '#3FB984',           // Verde esmeralda vívido e fresco
    successDark: '#2E8C64',       // Verde profundo para mensagens sólidas
  },
  ...common,
};


export const pastelTheme = {
  colors: {
    primary: '#A3B9C9',           // Azul pastel suave e calmo
    primaryDark: '#7F99AA',       // Azul acinzentado mais profundo
    secondary: '#E4B7C5',         // Rosa antigo delicado
    background: '#F9F7F3',        // Bege claríssimo, quase branco
    inputBackground: '#F2EEEB',   // Neutro confortável
    border: '#DAD5D1',            // Cinza bege discreto
    borderFocus: '#A3B9C9',       // Coerente com o primário
    text: '#4A4744',              // Marrom acinzentado escuro, suave e legível
    textLight: '#7B7672',         // Marrom claro para textos auxiliares
    subtleText: '#A09B97',        // Cinza amarronzado suave
    accent: '#F0CDA9',            // Pêssego pastel elegante
    accentDark: '#D3A97F',        // Pêssego mais profundo para contraste sutil
    textContrast: '#FFFFFF',      // Branco puro para destaques eventuais
    error: '#E6A3A3',             // Rosa claro, acolhedor mesmo em alertas
    errorDark: '#C68686',         // Rosa queimado suave
    success: '#A8D5BA',           // Verde menta pastel, relaxante
    successDark: '#87B89F',       // Verde menta um pouco mais escuro
  },
  ...common,
};
