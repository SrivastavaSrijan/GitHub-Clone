interface IErrorBoundaryProps {}
export const ErrorBoundary = (_props: IErrorBoundaryProps) => {
  console.log(_props);
  return <div className="flex flex-row"></div>;
};
