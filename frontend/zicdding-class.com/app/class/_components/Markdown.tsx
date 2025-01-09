import ReactMarkdown from 'react-markdown'

const Markdown = ({content}: {content: string}) => {
    return (
        <div className='md'>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown