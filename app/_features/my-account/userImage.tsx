import { IUserState } from "@/app/_interfaces/IUserState";
import Image from "next/image";
import noneBg from "@/public/none.jpg";


export default function UserImage({ user }: {user: IUserState}) {
    if (!user?.user) return null;

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-16 h-16 rounded-full">
                {user.user.avatar_url ? (
                    <Image
                        alt={user.user.name || "User Avatar"}
                        title={user.user.name || "User Avatar"}
                        src={user.user.avatar_url}
                        className="object-cover w-full rounded-full"
                        width={64}
                        height={64}
                    />
                ) : (
                    <Image
                        alt={user.user.name || "User Avatar"}
                        title={user.user.name || "User Avatar"}
                        src={noneBg}
                        className="object-cover w-full rounded-full"
                        width={64}
                        height={64}
                    />
                )}
            </div>
        </div>
    );
}