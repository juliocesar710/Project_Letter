import React, { useState } from 'react';
import styled from 'styled-components';
import FriendsList from '../components/Friends/FriendsList';
import FriendSearch from '../components/Friends/FriendSearch';
import FriendRequests from '../components/Friends/FriendRequests';

const FriendsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FriendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
  }
`;

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      lastSeen: 'Agora mesmo'
    },
    {
      id: 2,
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'offline',
      lastSeen: 'Há 2 horas'
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'online',
      lastSeen: 'Agora mesmo'
    }
  ]);

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 1,
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=4',
      message: 'Quer ser meu amigo?'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      avatar: 'https://i.pravatar.cc/150?img=5',
      message: 'Vamos nos conectar!'
    }
  ]);

  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      isFriend: true
    },
    {
      id: 2,
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'offline',
      isFriend: true
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'online',
      isFriend: true
    },
    {
      id: 4,
      name: 'Lucas Pereira',
      avatar: 'https://i.pravatar.cc/150?img=6',
      status: 'online',
      isFriend: false
    },
    {
      id: 5,
      name: 'Juliana Alves',
      avatar: 'https://i.pravatar.cc/150?img=7',
      status: 'offline',
      isFriend: false
    },
    {
      id: 6,
      name: 'Rafael Souza',
      avatar: 'https://i.pravatar.cc/150?img=8',
      status: 'online',
      isFriend: false
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      setFriends([...friends, { ...request, status: 'online', lastSeen: 'Agora mesmo' }]);
      setFriendRequests(friendRequests.filter(req => req.id !== requestId));
      // Atualiza o status de amigo no allUsers
      setAllUsers(allUsers.map(user => 
        user.id === requestId ? { ...user, isFriend: true } : user
      ));
    }
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
  };

  const handleAddFriend = (userId) => {
    setAllUsers(allUsers.map(user => 
      user.id === userId ? { ...user, isFriend: true } : user
    ));
    setFriends([...friends, allUsers.find(user => user.id === userId)]);
  };

  const handleRemoveFriend = (userId) => {
    setAllUsers(allUsers.map(user => 
      user.id === userId ? { ...user, isFriend: false } : user
    ));
    setFriends(friends.filter(friend => friend.id !== userId));
  };

  return (
    <FriendsContainer>
      <FriendsHeader>
        <TabsContainer>
          <TabButton 
            active={activeTab === 'friends'} 
            onClick={() => setActiveTab('friends')}
          >
            Amigos
          </TabButton>
          <TabButton 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            Pendentes
          </TabButton>
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            Usuários
          </TabButton>
        </TabsContainer>
        <FriendSearch />
      </FriendsHeader>
      
      {activeTab === 'friends' && <FriendsList friends={friends} />}
      {activeTab === 'pending' && (
        <FriendRequests 
          requests={friendRequests} 
          onAcceptRequest={handleAcceptRequest} 
          onRejectRequest={handleRejectRequest} 
        />
      )}
      {activeTab === 'users' && (
        <FriendsList 
          friends={allUsers} 
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          showFriendStatus={true}
        />
      )}
    </FriendsContainer>
  );
};

export default FriendsPage; 