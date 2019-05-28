<?php
/**
 * The template for displaying all single posts.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<?php while (have_posts()) : the_post(); ?>

			<?php get_template_part('template-parts/content', 'single'); ?>

			<button type="button" id="toggle-status">Toggle Status</button>

			<?php the_post_navigation(); ?>

		<?php endwhile;
	?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>