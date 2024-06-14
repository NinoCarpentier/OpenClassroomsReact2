import { useParams } from "react-router-dom";
import Profile from "../../pages/Profile";

const ProfileContainer = () => {
  const { id } = useParams();
  return <Profile id={id} />;
};

export default ProfileContainer;
