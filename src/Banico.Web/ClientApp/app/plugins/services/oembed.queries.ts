import gql from "graphql-tag";

export const OEmbedQuery = gql`
  query oEmbedQuery(
    $service: String
    $url: String
  ) {
    oEmbed(
      service: $service
      url: $url
    ) {
      response
    }
  }
`;
