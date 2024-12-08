import { MyInfo } from './_components/MyInfo';

export default function MyPage() {
  return (
    <>
      <div className="text-center">
        <div className="flex justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg w-full">
            <h1 className="text-3xl font-bold text-left mb-4">마이페이지</h1>
            <h2 className="text-lg font-medium text-left mb-6">내 정보</h2>

            <MyInfo mode="view" />
          </div>
        </div>
      </div>
    </>
  );
}
