import { useState,useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi.js";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    if ( (type === "signup" && (inputData.name === "" || inputData.email === "" || inputData.password === "") ) || (type === "login" && (inputData.email === "" || inputData.password === "")) ) {
      toast.error("Fill all fields")
      return;
    }
    
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup successful.")
    }
    if(registerError){
      toast.error(registerError.data.message || "Signup Failed");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if(loginError){ 
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center justify-center w-full mt-28">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">signup</TabsTrigger>
          <TabsTrigger value="login">login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new accountand click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="Eg. Abhay"
                  onChange={(e) => changeInputHandler(e , "signup")}
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Eg. Abhay@gmail.com"
                  required={true}
                  onChange={(e) => changeInputHandler(e , "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  required={true}
                  onChange={(e) => changeInputHandler(e , "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")} disabled={registerIsLoading} >
                {
                  registerIsLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin"/></>
                  ) : 
                  "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login here, after signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  required={true}
                  placeholder="Eg. Abhay@gmail.com"
                  onChange={(e) => changeInputHandler(e , "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  required={true}
                  onChange={(e) => changeInputHandler(e , "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")} disabled={loginIsLoading} >
                {
                  loginIsLoading ? (
                    <> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</>
                  ) : "Login"

                }
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
