type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-[1280px] px-4">{children}</div>;
}