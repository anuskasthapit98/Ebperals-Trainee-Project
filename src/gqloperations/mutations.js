import {gql} from '@apollo/client';
export const SIGNUP_USER = gql`

mutation($email:String!,$password:String!){
    addAdmin(data:{
      email:$email,
      password:"sandeep123@#$",
      name:"sandeep yadav"
    }){
      accessToken
      refreshToken
    }
  }
`