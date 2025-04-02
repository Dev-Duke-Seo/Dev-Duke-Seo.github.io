import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Item = styled.li`
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const Card = styled.article`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.3s;

  ${Item}:hover & {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: #222;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const CardDescription = styled.p`
  color: #555;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.85rem;
  color: #666;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const CardDate = styled.time`
  font-weight: 500;
`;

export const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const CardTag = styled.span`
  background-color: #f1f5f9;
  color: #4a5568;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #666;

  h2 {
    margin-bottom: 1rem;
  }
`; 