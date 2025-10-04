import RegisterForm from '@/app/components/RegisterForm';
import SignIn from '@/app/components/sign-in';

const RegistrationPage = async () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
      <div className="container md:w-[50%] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Create Account</h1>
          <p className="text-blue-200 text-center mt-2">
            Join us and start organizing your tasks
          </p>
        </div>

        <SignIn />

        <div className="relative flex items-center my-6 w-[70%] mx-auto">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Registration Form */}
        <RegisterForm />

      </div>
    </div>
  );
};

export default RegistrationPage;