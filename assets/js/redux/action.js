
export const type={
    switchMenu:'switch_menu'
};

export const switchMenu=(title)=>(
    {
        type:type.switchMenu,
        payload:title
    }
);