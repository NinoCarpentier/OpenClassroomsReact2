import styled from "styled-components";
import { Link } from "react-router-dom";

import Card from "../../components/Card";
import colors from "../../utils/styles/colors";
import { Loader } from "../../utils/styles/atoms";
import { useFetch, useTheme } from "../../utils/hooks";

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Freelances = () => {
  const { theme } = useTheme();
  const { isLoading, data, error } = useFetch(
    `http://localhost:8000/freelances`
  );
  const { freelancersList } = data;

  if (error) {
    return <span>Oups, il y a eu une erreur quelque part.</span>;
  }

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny, nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList &&
            freelancersList.map((profile) => (
              <Link
                key={`freelance-${profile.id}`}
                to={`/profile/${profile.id}`}
              >
                <Card
                  key={`${profile.name}-${profile.id}`}
                  label={profile.job}
                  picture={profile.picture}
                  title={profile.name}
                  theme={theme}
                />
              </Link>
            ))}
        </CardsContainer>
      )}
    </div>
  );
};

export default Freelances;
