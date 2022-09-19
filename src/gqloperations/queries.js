import { gql } from '@apollo/client';

export const USERS = gql`
    query {
        users {
            id
            name
            username
            companyName
            email
            phone
            userType
        }
    }
`;

export const PROJECTS = gql`
    query {
        projects {
            _id
            projectName
            description
            startDate
            endDate
            users {
                name
                username
                companyName
                email
                userType
                phone
            }
        }
    }
`;

export const USER_BY_ID = gql`
    query ($id: String!) {
        findUserById(id: $id) {
            id
            name
            username
            companyName
            email
            phone
            userType
        }
    }
`;

export const PROJECT_BY_ID = gql`
    query ($id: String!) {
        findProjectById(id: $id) {
            _id
            projectName
            description
            startDate
            endDate
            users {
                name
                username
                companyName
                email
                phone
                userType
            }
        }
    }
`;
