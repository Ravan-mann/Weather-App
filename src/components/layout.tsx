import {type PropsWithChildren} from "react"; 
import Header from "./header";
const Layout = ({children } : PropsWithChildren) => {
    

    return (
        <>
        <div className="bg-linear-to-br from-background to-muted"></div>
        <Header />
        <main className=" min-h-screen container mx-auto px-4 py-8">
            
        {children}
        
        </main>
        <footer className="border-t backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
                <p>
                    made with ❤️ by Mann
                </p>
            </div>
        </footer>
        </>
    );
}
export default Layout;
