<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

        <section class="browse-archives">
            <header>
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
            </header>

            <div class="post-archives">
                <h2>Quote Authors</h2>
                <ul>
                    <?php
                    $posts = get_posts('posts_per_page=-1');
                    // using -1 means "grab all the posts" rather than setting to a specific number
                    foreach ($posts as $post) : setup_postdata($post);
                        // setting up the post data allows us to use the template tags for searching looping
                        ?>
                        <li>
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </li>
                    <?php endforeach;
                wp_reset_postdata(); ?>
                </ul>
            </div>

            <div class="category-archives">
                <h2>Categories</h2>
                <ul>

                    <?php wp_list_categories('title_li='); ?>
                    <!-- with the list_categories the title_li= means it will create list items out of each item in the list -->
                </ul>
            </div>


            <div class="tag-archives">
                <h2>Tags</h2>
                <?php
                wp_tag_cloud(
                    array(
                        'smallest' => 1,
                        'largest' => 1,
                        'unit' => 'rem',
                        'format' => 'list'
                    )
                );
                ?>
            </div>

        </section>
        <!-- end of .browse-archives section -->

    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>