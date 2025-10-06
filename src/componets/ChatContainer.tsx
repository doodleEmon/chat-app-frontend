import React from 'react'

export default function ChatContainer({ value }: { value: number }) {
    return (
        <div>
            <div>chatting header</div>
            <div>content area for {value}</div>
            <div>chatting input field</div>
        </div>
    )
}
