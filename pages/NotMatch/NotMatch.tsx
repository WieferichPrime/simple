import { useRouter } from "next/router";

const NotMatch = () => {
    const router = useRouter();
    return (
        <>
            <h3>404 error</h3>
            <p>Page {router.pathname} doesn't exist</p>
        </>
    )
};

export default NotMatch;