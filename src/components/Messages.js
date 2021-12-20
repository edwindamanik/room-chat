import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div className='pesanKonten'>
            <div className='foto'>
                {photoURL ? (
                    <img src={photoURL} alt="Avatar" width={45} height={45}/>
                ) : null}
            </div>
            <div className='column2'>
                {displayName ? <p className='nama'>{displayName}</p> : null }
                <div className='bagianPesan'>
                    <p className='pesan'>{text}</p>
                    {createdAt?.seconds ? (
                        <span className='waktu'>
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date()
                            )}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Message;