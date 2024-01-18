
import apiURL from '@/constants/api';

export async function getUserInfos(username: string) {
        const response =  await fetch(`${apiURL}/users/${username}`);
        return response.json();
}

export async function getUserRepos(username: string) {
        const response =  await fetch(`${apiURL}/users/${username}/repos`);
        return response.json();
}

export async function getRepoInfos(username: string, repo: string) {
    const response = await fetch(`${apiURL}/repos/${username}/${repo}`);
    return response.json();
}