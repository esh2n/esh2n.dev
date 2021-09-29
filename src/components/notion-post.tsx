import React, { useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactJSXParser from '@zeit/react-jsx-parser';
import Heading from '@components/heading';
import components from '@components/dynamic';
import { textBlock } from '@lib/notion/renderers';
import { NotionPost } from 'types';
import blogStyles from '@styles/blog.module.scss';
import styled from '@emotion/styled';
import PostTitle from '@components/post-title';
import { getDateStr } from '@lib/blog-helpers';
import NextHead from 'next/head';

type Props = {
  post: NotionPost;
  redirect: string;
  preview: boolean;
  ogImageUrl?: string;
};

interface IListItems {
  listTagName: string | null;
  listLastId: string | null;
  listMap: {
    [id: string]: {
      key: string;
      isNested?: boolean;
      nested: string[];
      children: React.ReactFragment;
    };
  };
}
const textColor = '#333333';
const bgColor = '#edf2f7';
const primaryColor = '#2e343f';
const whiteTextColor = '#d8deea';

const StyledPostBodyWrapper = styled.article`
  grid-area: post-body;
  background-color: #f5f5f5;
  border-radius: 20px;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1));
  width: 100%;
  display: block;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }

  & {
    color: ${textColor};
    font-size: 16px;
    @media (min-width: 768px) {
      padding: 48px 40px;
    }
    padding: 36px 20px;
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${textColor};
    margin-top: 2.3em;
    margin-bottom: 0.5em;
    font-weight: 700;
    margin: 0;
    line-height: 1.5;
    outline: 0;
    text-align: start;
  }

  p,
  li,
  td {
    font-size: 16px;
    color: ${textColor};
    margin: 0;
    font-weight: 500;
  }

  p {
    text-align: start;
  }

  p + p {
    margin-top: 1.2em;
  }
  table th {
    background-color: ${bgColor};
    color: ${textColor};
  }
  a {
    text-decoration: none;
    color: #0f83fd;
  }
  table tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  h1 {
    padding-bottom: 0.2em;
    font-size: 1.7em;
    margin-bottom: 1.1rem;
    border-bottom: 1px solid ${whiteTextColor};
    margin-top: 2.3em;
  }

  h2 {
    padding-bottom: 0.2em;
    font-size: 1.5em;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${whiteTextColor};
    margin-top: 2.3em;
  }

  h3 {
    padding-bottom: 0.2em;
    margin-bottom: 1rem;
    border-bottom: 1px dotted ${whiteTextColor};
    margin-top: 1.7em;
  }
  h4 {
    margin-bottom: 1rem;
    margin-top: 1.7em;
  }

  code {
    background-color: ${primaryColor};
    color: ${whiteTextColor};
    padding: 2.5px 5px;
    border-radius: 4px;
    font-size: 0.7em;
    margin: 0px 0.2em 0.4em;
    vertical-align: middle;
  }

  blockquote {
    font-size: 0.97em;
    margin: 1.4rem 0;
    border-left: 3px solid #b3bfc7;
    padding: 2px 0 2px 0.7em;
    color: #626e77;
  }
  li {
    text-align: start;
  }

  & {
    h1:first-child {
      margin-top: 20px;
    }
  }
`;

const NotionPostBody = ({ post, redirect, preview, ogImageUrl }: Props) => {
  const listTypes = new Set(['bulleted_list', 'numbered_list']);
  const router = useRouter();
  const listItems: IListItems = {
    listTagName: null,
    listLastId: null,
    listMap: {},
  };

  useEffect(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js';
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        (window as any).twttr.widgets.load();
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = twitterSrc;
        document.querySelector('body').appendChild(script);
      }
    }
  }, [post]);

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect);
    }
  }, [redirect, post, router]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>Redirecting you back to the scraps index</p>
      </div>
    );
  }

  const content = post.content;

  const renderEl = () => {
    const returnedEl = (post.content || []).map((block, blockIdx) => {
      const { value } = block;
      const { type, properties, id, parent_id } = value;
      const isLast = blockIdx === post.content.length - 1;
      const isList = listTypes.has(type);
      let toRender = [];

      if (isList) {
        listItems.listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol'];
        listItems.listLastId = `list${id}`;

        listItems.listMap[id] = {
          key: id,
          nested: [],
          children: textBlock(properties.title, true, id),
        };

        if (listItems.listMap[parent_id]) {
          listItems.listMap[id].isNested = true;
          listItems.listMap[parent_id].nested.push(id);
        }
      }

      if (listItems.listTagName && (isLast || !isList)) {
        toRender.push(
          React.createElement(
            listItems.listTagName,
            { key: listItems.listLastId! },
            Object.keys(listItems.listMap).map((itemId) => {
              if (listItems.listMap[itemId].isNested) return null;

              const createEl = (item) =>
                React.createElement(
                  components.li || 'ul',
                  { key: item.key },
                  item.children,
                  item.nested.length > 0
                    ? React.createElement(
                        components.ul || 'ul',
                        { key: item + 'sub-list' },
                        item.nested.map((nestedId) => createEl(listItems.listMap[nestedId])),
                      )
                    : null,
                );
              return createEl(listItems.listMap[itemId]);
            }),
          ),
        );
        listItems.listMap = {};
        listItems.listLastId = null;
        listItems.listTagName = null;
      }

      const renderHeading = (Type: string | React.ComponentType) => {
        toRender.push(
          <Heading key={id}>
            <Type key={id}>{textBlock(properties.title, true, id)}</Type>
          </Heading>,
        );
      };

      const renderBookmark = ({ link, title, description, format }) => {
        const { bookmark_icon: icon, bookmark_cover: cover } = format;
        toRender.push(
          <div className={blogStyles.bookmark}>
            <div>
              <div style={{ display: 'flex' }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={blogStyles.bookmarkContentsWrapper}
                  href={link}
                >
                  <div role="button" className={blogStyles.bookmarkContents}>
                    <div className={blogStyles.bookmarkInfo}>
                      <div className={blogStyles.bookmarkTitle}>{title}</div>
                      <div className={blogStyles.bookmarkDescription}>{description}</div>
                      <div className={blogStyles.bookmarkLinkWrapper}>
                        <img src={icon} className={blogStyles.bookmarkLinkIcon} />
                        <div className={blogStyles.bookmarkLink}>{link}</div>
                      </div>
                    </div>
                    <div className={blogStyles.bookmarkCoverWrapper1}>
                      <div className={blogStyles.bookmarkCoverWrapper2}>
                        <div className={blogStyles.bookmarkCoverWrapper3}>
                          <img src={cover} className={blogStyles.bookmarkCover} />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>,
        );
      };

      switch (type) {
        case 'page':
        case 'divider':
          break;
        case 'text':
          if (properties) {
            toRender.push(textBlock(properties.title, false, id));
          }
          break;
        case 'image':
        case 'video':
        case 'embed': {
          const { format = {} } = value;
          const { block_width, block_height, display_source, block_aspect_ratio } = format;
          const baseBlockWidth = 768;
          const roundFactor = Math.pow(10, 2);
          const width = block_width
            ? `${Math.round((block_width / baseBlockWidth) * 100 * roundFactor) / roundFactor}%`
            : block_height || '100%';

          const isImage = type === 'image';
          const Comp = isImage ? 'img' : 'video';
          const useWrapper = block_aspect_ratio && !block_height;
          const childStyle: CSSProperties = useWrapper
            ? {
                width: '100%',
                height: '100%',
                border: 'none',
                position: 'absolute',
                top: 0,
              }
            : {
                width,
                border: 'none',
                height: block_height,
                display: 'block',
                maxWidth: '100%',
              };

          let child = null;

          if (!isImage && !value.file_ids) {
            // external resource use iframe
            child = (
              <iframe
                style={childStyle}
                src={display_source}
                key={!useWrapper ? id : undefined}
                className={!useWrapper ? 'asset-wrapper' : undefined}
              />
            );
          } else {
            // notion resource
            child = (
              <Comp
                key={!useWrapper ? id : undefined}
                src={`/api/asset?assetUrl=${encodeURIComponent(
                  display_source as any,
                )}&blockId=${id}`}
                controls={!isImage}
                alt={`An ${isImage ? 'image' : 'video'} from Notion`}
                loop={!isImage}
                muted={!isImage}
                autoPlay={!isImage}
                style={childStyle}
                className="notion-img"
              />
            );
          }

          toRender.push(
            useWrapper ? (
              <div
                style={{
                  paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                  position: 'relative',
                }}
                className="asset-wrapper"
                key={id}
              >
                {child}
              </div>
            ) : (
              child
            ),
          );
          break;
        }
        case 'header':
          renderHeading('h1');
          break;
        case 'sub_header':
          renderHeading('h2');
          break;
        case 'sub_sub_header':
          renderHeading('h3');
          break;
        case 'bookmark':
          const { link, title, description } = properties;
          const { format = {} } = value;
          renderBookmark({ link, title, description, format });
          break;
        case 'code': {
          if (properties.title) {
            const content = properties.title[0][0];
            const language = properties.language[0][0];

            if (language === 'LiveScript') {
              // this requires the DOM for now
              toRender.push(
                <ReactJSXParser
                  key={id}
                  jsx={content}
                  components={components}
                  componentsOnly={false}
                  renderInpost={false}
                  allowUnknownElements={true}
                  blacklistedTags={['script', 'style']}
                />,
              );
            } else {
              toRender.push(
                <components.Code key={id} language={language || ''}>
                  {content}
                </components.Code>,
              );
            }
          }
          break;
        }
        case 'quote': {
          if (properties.title) {
            toRender.push(
              React.createElement(components.blockquote, { key: id }, properties.title),
            );
          }
          break;
        }
        case 'callout': {
          toRender.push(
            <div className="callout" key={id}>
              {value.format?.page_icon && <div>{value.format?.page_icon}</div>}
              <div className="text">{textBlock(properties.title, true, id)}</div>
            </div>,
          );
          break;
        }
        case 'tweet': {
          if (properties.html) {
            toRender.push(<div dangerouslySetInnerHTML={{ __html: properties.html }} key={id} />);
          }
          break;
        }
        case 'equation': {
          if (properties && properties.title) {
            const content = properties.title[0][0];
            toRender.push(
              <components.Equation key={id} displayMode={true}>
                {content}
              </components.Equation>,
            );
          }
          break;
        }
        default:
          if (process.env.NODE_ENV !== 'production' && !listTypes.has(type)) {
            console.log('unknown type', type);
          }
          break;
      }

      return toRender;
    });
    return returnedEl;
  };
  const title = post.Page;
  const date = getDateStr(post.Date);
  const emoji = post.Emoji;
  return (
    <>
      <NextHead>
        <title>{title} | esh2n.dev</title>
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:image" content={ogImageUrl} />
      </NextHead>
      <PostTitle title={title} date={date} emoji={emoji} />
      <StyledPostBodyWrapper>
        {preview && (
          <div className={blogStyles.previewAlertContainer}>
            <div className={blogStyles.previewAlert}>
              <b>Note:</b>
              {` `}Viewing in preview mode{' '}
              <Link href={`/api/clear-preview?slug=${post.Slug}`}>
                <button className={blogStyles.escapePreview}>Exit Preview</button>
              </Link>
            </div>
          </div>
        )}
        <>
          {(!content || content.length === 0) && <p>This post has no content</p>}
          {renderEl()}
        </>
      </StyledPostBodyWrapper>
    </>
  );
};

export default NotionPostBody;
