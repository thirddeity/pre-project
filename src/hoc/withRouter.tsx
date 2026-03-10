import { useNavigate, type NavigateFunction } from "react-router";

export type WithRouterProps = {
  router: NavigateFunction;
};

export function withRouter<P extends WithRouterProps>(ChildComponent: React.ComponentType<P>) {
  return (props: Omit<P, "router">) => {
    const router = useNavigate();
    return <ChildComponent {...(props as P)} router={router} />;
  };
}
