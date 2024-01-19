import axios, { AxiosResponse } from 'axios';
import apiURL from '@/constants/api';
import { ReposInterface, UserInterface, UserReposInterface } from '@/interfaces';

export const getUserInfos = (username: string) : Promise<AxiosResponse<UserInterface>> => 
     axios.get(`${apiURL}/users/${username}`);

export const getUserRepos = (username: string) : Promise<AxiosResponse<UserReposInterface>> => 
     axios.get(`${apiURL}/users/${username}/repos`);

export const getRepoInfos = (username: string, repo: string) : Promise<AxiosResponse<ReposInterface>> => 
     axios.get(`${apiURL}/repos/${username}/${repo}`);
