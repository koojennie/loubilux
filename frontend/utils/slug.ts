type slugProps = {
    name: string;
}


const generateSlug = ({name}: slugProps) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');;
}

export default generateSlug;