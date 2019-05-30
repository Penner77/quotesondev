<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-info">

		<?php wp_nav_menu(array('theme_location' => 'primary', 'menu_id' => 'primary-menu')); ?>

		<!-- 
		<p class="footer-about"><a href="quotesondev/about/">About</a></p>
		<p class="footer-archives"><a href="quotesondev/archives/">Archives</a></p>
		<p class="footer-submission"><a href="quotesondev/submit/">Submit a Quote</a></p> -->
		<p class="footer-branding">Brought to you by <a href="https://redacademy.com/vancouver/"><span class="red-brand">RED Academy</span></a></p>

	</div><!-- .site-info -->
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>