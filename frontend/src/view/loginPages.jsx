import AuthForm from "../component/auth/formAuth";

function LoginPages() {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-2 gap-5 p-5">
          <AuthForm />
        </div>
      </div>
    );
}

export default LoginPages;