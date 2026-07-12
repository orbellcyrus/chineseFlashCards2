type buttonProps = {
    onClick: ()=> void,
    children: React.ReactNode,
}
export function Next({onClick,children}:buttonProps){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}

export function Previous({onClick,children}:buttonProps){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}

export function CardButton({onClick,children}:buttonProps){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}