import React from 'react';
import {MessageAttachment} from "@/types/Message.model";

interface Props {
  content: string;
  attachments?: MessageAttachment[];
}

const MessageUser = ({ content, attachments }: Props) => {

  return (
    <div className={'flex flex-col w-full animate-[fade-in_0.25s_ease-out] items-end'}>
      {
        attachments?.length ? (
          <div className={'max-w-[330px] flex gap-3 flex-wrap mb-3'}>
            {
              attachments?.map((attachment) => {
                return (
                  <img key={attachment.id} src={attachment?.url} width={100} height={100} alt={attachment.url} className={'rounded-lg'} />
                )
              })
            }
          </div>
        ) : null
      }
      <div
        className={'rounded-2xl px-4 py-3 text-sm shadow-sm bg-primary text-white max-w-[85%]'}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  );
};

export default React.memo(MessageUser);