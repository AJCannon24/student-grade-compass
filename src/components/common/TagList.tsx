
import React from 'react';
import Tag from './Tag';
import { ReviewTag } from '@/types';

interface TagListProps {
  tags: ReviewTag[];
  onTagClick?: (tag: ReviewTag) => void;
  activeTags?: ReviewTag[];
  className?: string;
}

const TagList: React.FC<TagListProps> = ({ 
  tags, 
  onTagClick, 
  activeTags = [],
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          active={activeTags.includes(tag)}
        />
      ))}
    </div>
  );
};

export default TagList;
