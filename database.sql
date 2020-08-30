CREATE TABLE "users" (
	"id" serial NOT NULL,
	"first_name" varchar(500) NOT NULL,
	"last_name" varchar(455) NOT NULL,
	"email" varchar(455) NOT NULL UNIQUE,
	"password" varchar(455) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


INSERT into "users" ("first_name", "last_name", "email", "password")
VALUES ('That', 'Guy', 'thatguy@email.com', 'nopass');


CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"post_title" varchar(255) NOT NULL,
	"post_body" varchar(2000) NOT NULL,
	"user_id" integer NOT NULL,
	"likes" integer DEFAULT 0,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "resources" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" varchar(2000) NOT NULL,
	"upvote_count" integer NOT NULL,
	"report" integer NOT NULL,
	CONSTRAINT "resources_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "post_likes"{
	"id" serial primary key,
	"user_id" integer not null,
	"post_id" integer not null,

} WITH (
  OIDS=FALSE
);

CREATE TABLE "post_comments" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"body" varchar(2000) NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "post_comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "profile" (
	"user_id" integer NOT NULL,
	"avatar" varchar(255) NOT NULL,
	"bio" varchar(2000) NOT NULL,
	"facebook" varchar(250) DEFAULT '',
	"twitter" varchar(250) DEFAULT '',
	"github" varchar(250) DEFAULT '',
	"personal_site" varchar(250) DEFAULT '',
	"linkedin" varchar(250) DEFAULT '',
	"email" varchar(250) DEFAULT '',
	"phone" varchar(250) DEFAULT '',
) WITH (
  OIDS=FALSE
);



CREATE TABLE "social_links" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"platform_name" varchar(255) NOT NULL,
	"profile_url" varchar(455) NOT NULL,
	CONSTRAINT "social_links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "resource_comments" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"body" varchar(2000) NOT NULL,
	CONSTRAINT "resource_comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE;
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_user_id" UNIQUE("user_id", "post_id");


ALTER TABLE "resources" ADD CONSTRAINT "resources_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE;

ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "social_links" ADD CONSTRAINT "social_links_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "resource_comments" ADD CONSTRAINT "resource_comments_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "resource_comments" ADD CONSTRAINT "resource_comments_resource_id" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE;



INSERT into "posts" ("post_title", "post_body", "user_id")
VALUES ('This is a Post', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam eaque, inventore explicabo maiores velit, maxime voluptatem quibusdam, nobis rem consectetur. Est ipsum, nulla sint officiis vitae nihil porro illum?', 1)

