import { MyInfoForm } from './_components/MyInfoForm';

export default function MyPage() {
  return (
    <>
      <div className="text-center">
        <div className="flex justify-center min-h-screen">
          <div className="w-[1280px] bg-white p-8 rounded-lg w-full">
            <h1 className="text-3xl font-bold text-left mb-4">마이페이지</h1>
            <h2 className="text-lg font-medium text-left mb-6">개인정보 수정</h2>

            <div className="flex justify-center mb-8">
              <img src="/my/default-profile.png" alt="Profile" width="205" className="bg-gray-200" />
            </div>

            <MyInfoForm />
          </div>
        </div>
      </div>
    </>
  );
}
