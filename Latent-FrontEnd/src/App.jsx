import { Route, Routes } from 'react-router-dom';

import { House, Landing, Explore, AgentHome, Profile, Login, SignUp, CreateHouse } from './pages';

const App = () => {

  return (
    <div className="relative flex">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/houses/:houseId" element={<House />} />
        <Route path="/user" element={<AgentHome />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/houses/new" element={<CreateHouse />} />
      </Routes>
    </div>
  );
};

export default App;
