BEGIN;

DROP TABLE IF EXISTS users, posts, comments, tags, posts_tags;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (slug)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name)
);

CREATE TABLE posts_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Fake Data 

INSERT INTO users (username, password, email) VALUES ('admin', 'admin', 'admin@gmail.com');
INSERT INTO users (username, password, email) VALUES ('user', 'user', 'user@gmail.com');

INSERT INTO posts (title, content, user_id, slug) VALUES ('Post 1', 'Content 1', 1, 'post-1');
INSERT INTO posts (title, content, user_id, slug) VALUES ('Post 2', 'Content 2', 1, 'post-2');

INSERT INTO comments (content, user_id, post_id) VALUES ('Comment 1', 1, 1);
INSERT INTO comments (content, user_id, post_id) VALUES ('Comment 2', 1, 1);

INSERT INTO tags (name) VALUES ('tag 1');
INSERT INTO tags (name) VALUES ('tag 2');

INSERT INTO posts_tags (post_id, tag_id) VALUES (1, 1);
INSERT INTO posts_tags (post_id, tag_id) VALUES (1, 2);

COMMIT;

-- path = C:/Users/KARAM/Desktop/Revision/Backend/portfolio/src/database/config/build.sql