interface Props {
    children?: React.ReactNode;
}

export const Main: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div>hello from</div>
            {children}
        </div>
    );
};

export default Main;
