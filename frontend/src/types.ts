import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY_BY_ID = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      name
      code
      continent {
        name
      }
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
      countries {
        id
        name
        code
      }
    }
  }
`;
