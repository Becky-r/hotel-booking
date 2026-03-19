// splash screen 

interface SplashScreenProps {
    message?: string
}

export function SplashScreen({ message = "Loading..." }: SplashScreenProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background ">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl text-foreground font-bold tracking-widest">
                    Kerawi International Hotel
                </h1>
                <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
            </div>
        </div>
    )
}