package com.rishi.stocktradeapp.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
	
	private UserDetailsService userDetailsService;
	private JWTTokenHelper jwtTokenHelper;
	
	public JWTAuthenticationFilter(UserDetailsService theUserDetailsService, JWTTokenHelper theJwtTokenHelper) {
		this.jwtTokenHelper=theJwtTokenHelper;
		this.userDetailsService=theUserDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authToken=jwtTokenHelper.getAuthHeaderFromHeader(request);
		
		if(null!=authToken) {
			
			String userName=jwtTokenHelper.getUsernameFromToken(authToken);
			
			if(null!=userName) {
				
				UserDetails userDetails=userDetailsService.loadUserByUsername(userName);

				if(jwtTokenHelper.validateToken(authToken, userDetails)) {
					
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
					
					authentication.setDetails(request);
					
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
				
			}
		}
		
		filterChain.doFilter(request, response);
	}
}
