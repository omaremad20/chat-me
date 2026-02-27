import { IUserInput } from "@/app/_interfaces/IUserInput";

export default function UserDataList({ userInputs }: { userInputs: IUserInput[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 flex-1 gap-4">
      {
        userInputs.map((item: IUserInput) => <li key={item.header} className="flex flex-col space-y-1">
          <p className="font-semibold text-xs italic">{item.header}</p>
          <div className="bg-white opacity-50 font-semibold shadow p-1.5 rounded-md border border-gray-300">{item.data}</div>
        </li>)
      }
    </ul>

  )
}
