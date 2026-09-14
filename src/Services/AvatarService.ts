


export class AvatarService {


    static getAvatarUrl = (seed: string) => {
        return `https://api.dicebear.com/10.x/toon-head/png?seed=${encodeURIComponent(seed)}`;
    };

}