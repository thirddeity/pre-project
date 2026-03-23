import { useLocation, useNavigate, useParams, type NavigateFunction, type Params } from "react-router";

export type WithRouterProps = {
  location: Location;
  navigate: NavigateFunction;
  params: Params;
};

export function withRouter<P extends WithRouterProps>(ChildComponent: React.ComponentType<P>) {
  return (props: Omit<P, keyof WithRouterProps>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <ChildComponent {...(props as P)} location={location} navigate={navigate} params={params} />;
  };
}
