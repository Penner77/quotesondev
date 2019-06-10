<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

$source = get_post_meta(get_the_ID(), '_qod_quote_source', true);
$source_url = get_post_meta(get_the_ID(), '_qod_quote_source_url', true);
// var_dump($source);
// var_dump($source_url);

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

	<div class="entry-meta">
		<?php the_title('<h2 class="entry-title">&mdash; ', '</h2>'); ?>
		<!-- mdash creates a large dash/hyphen, like the copyright symbol code -->

		<?php if ($source && $source_url) : ?>
			<span class="source">, <a href="<?php echo $source_url; ?>">
					<?php echo $source; ?>
				</a></span>
		<?php elseif ($source) : ?>
			<span class="source">
				<?php echo $source; ?>
			</span>

		<?php else : ?>
			<span class="source">
			</span>

		<?php endif; ?>

	</div>

</article><!-- #post-## -->

<?php if (is_home() || is_single()) :  ?>
	<!-- above says "if it's a home/blog page, or a single page type...." -->
	<div class="button-submission"><button type="button" id="new-quote-button">Show Me Another!</button></div>
<?php endif; ?>