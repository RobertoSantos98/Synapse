


export class AvatarService {


    static getAvatarUrl = (seed: string) => {
        return `https://api.dicebear.com/10.x/adventurer/png?seed=${encodeURIComponent(seed)}`;
    };

}