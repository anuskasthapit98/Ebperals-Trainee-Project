import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
    mutation ($projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        createProject(
            projectInput: { projectName: $projectName, description: $description, startDate: $startDate, endDate: $endDate, users: $users }
        ) {
            _id
            projectName
            description
            startDate
            endDate
            users
        }
    }
`;

export const CREATE_USER = gql`
    mutation ($companyName: String!, $email: String!, $name: String!, $username: String!, $phone: Float!, $userType: UserType!) {
        createUser(
            userInput: { companyName: $companyName, email: $email, name: $name, phone: $phone, username: $username, userType: $userType }
        ) {
            id
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

export const UPDATE_USER = gql`
    mutation ($_id: ID!, $companyName: String!, $email: String!, $name: String!, $username: String!, $phone: Float!, $userType: UserType!) {
        updateUser(
            updateUserInput: {
                _id: $_id
                companyName: $companyName
                email: $email
                name: $name
                phone: $phone
                username: $username
                userType: $userType
            }
        ) {
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation ($_id: String!, $projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        updateProject(
            updateProjectInput: {
                _id: $_id
                projectName: $projectName
                description: $description
                startDate: $startDate
                endDate: $endDate
                users: $users
            }
        ) {
            projectName
            description
            startDate
            endDate
            users
        }
    }
`;
