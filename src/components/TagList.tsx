import React from "react";
import useContentStore from "stores/ContentStore";
import * as S from "./TagListStyle";


export default function TagList() {
  const { allTags, selectedTag, setSelectedTag } = useContentStore();

  if (!allTags || allTags.length === 0) {
    return null;
  }

  const handleTagClick = (tag: string) => {
    if (selectedTag?.name === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(allTags.find(t => t.name === tag) || null);
    }
  };

  return (
    <S.TagContainer>
      <S.TagItem
        $active={selectedTag === null}
        onClick={() => setSelectedTag(null)}
      >
        전체
      </S.TagItem>
      {allTags.map((tag) => (
        <S.TagItem
          key={tag.name}
          $active={selectedTag?.name === tag.name}
          onClick={() => handleTagClick(tag.name)}
        >
          #{tag.name}
        </S.TagItem>
      ))}
    </S.TagContainer> 
  );
}
