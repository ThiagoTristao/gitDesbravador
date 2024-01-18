import axios from 'axios';
import apiURL from '@/constants/api';

export async function getUserInfos(username: string) {
    return await axios.get(`${apiURL}/users/${username}`)
}

export async function getUserRepos(username: string) {
    return await axios.get(`${apiURL}/users/${username}/repos`)
}

export async function getRepoInfos(username: string, repo: string) {
    return await axios.get(`${apiURL}/repos/${username}/${repo}`)
}