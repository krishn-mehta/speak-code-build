import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { 
      conversationId, 
      userPrompt, 
      templateType = 'custom',
      title,
      websiteId,
      action
    } = await req.json();

    console.log('Processing website request:', { conversationId, userPrompt, templateType, title, websiteId, action });

    // Handle website iteration (modify existing website)
    if (action === 'iterate' && websiteId) {
      return await handleWebsiteIteration(supabase, websiteId, userPrompt, req);
    }

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    let htmlContent = '';
    let cssContent = '';
    let jsContent = '';

    if (openAIApiKey) {
      // Use OpenAI for advanced React app generation
      console.log('Using OpenAI for React website generation');
      
      const systemPrompt = `You are a professional React developer and UI/UX expert. Generate a complete, modern, responsive React application based on the user's requirements.

Rules:
- Generate a complete React app with TypeScript
- Use functional components with React hooks
- Use Tailwind CSS for all styling (no custom CSS unless absolutely necessary)
- Create proper component architecture with reusable components
- Include proper TypeScript interfaces
- Make it fully responsive (mobile-first)
- Add subtle animations and hover effects using Tailwind
- Use modern React patterns and best practices
- Include proper accessibility attributes
- Create a professional, polished design

Return a JSON object with three properties:
- react_code: Complete React App.tsx and components (as single file for now)
- styles: Tailwind configuration and any custom CSS
- config: package.json with all necessary dependencies

User requirements: ${userPrompt}
Template type: ${templateType}
Website title: ${title || 'Generated Website'}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedContent = data.choices[0].message.content;
        
        try {
          const parsed = JSON.parse(generatedContent);
          htmlContent = parsed.react_code || '';
          cssContent = parsed.styles || '';
          jsContent = parsed.config || '';
        } catch (parseError) {
          console.log('Failed to parse OpenAI response as JSON, using React template');
        }
      }
    }

    // Fallback to React templates if OpenAI fails or is not available
    if (!htmlContent) {
      console.log('Using React template-based generation');
      const templates = getReactTemplates();
      const template = templates[templateType] || templates.portfolio;
      
      htmlContent = template.react_code.replace(/\{TITLE\}/g, title || 'My Website');
      cssContent = template.styles;
      jsContent = template.config || '';
    }

    // Get user info from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Save the generated website
    const { data: website, error: insertError } = await supabase
      .from('generated_websites')
      .insert({
        user_id: user.id,
        conversation_id: conversationId,
        title: title || 'Generated Website',
        description: userPrompt.substring(0, 200),
        html_content: htmlContent,
        css_content: cssContent,
        js_content: jsContent,
        template_type: templateType,
        metadata: { 
          generated_at: new Date().toISOString(),
          prompt: userPrompt 
        }
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        website,
        message: 'Website generated successfully!' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in website-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Website generation failed', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Handle website iteration (modify existing website)
async function handleWebsiteIteration(supabase: any, websiteId: string, prompt: string, req: Request) {
  try {
    // Get user from auth header  
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Get existing website
    const { data: existingWebsite, error: fetchError } = await supabase
      .from('generated_websites')
      .select('*')
      .eq('id', websiteId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingWebsite) {
      throw new Error('Website not found or access denied');
    }

    let updatedReactCode = existingWebsite.html_content;
    let updatedStyles = existingWebsite.css_content;
    let updatedConfig = existingWebsite.js_content || '';

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (openAIApiKey) {
      // Use OpenAI to iterate the React website
      const iterationPrompt = `You are an expert React developer. The user wants to modify an existing React website.

CURRENT REACT WEBSITE:
Title: ${existingWebsite.title}
Description: ${existingWebsite.description || 'No description'}

CURRENT REACT CODE:
${existingWebsite.html_content}

CURRENT STYLES (Tailwind):
${existingWebsite.css_content}

CURRENT CONFIG:
${existingWebsite.js_content || 'None'}

USER MODIFICATION REQUEST:
${prompt}

Please provide the updated React website code. Make the requested changes while preserving the existing structure and modern practices. Ensure the website uses:
- React functional components with hooks
- TypeScript
- Tailwind CSS for styling
- Modern component patterns
- Responsive design

Return a JSON object with:
{
  "react_code": "complete updated React components and App.tsx",
  "styles": "updated Tailwind classes and custom CSS", 
  "config": "updated package.json and configuration files"
}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: iterationPrompt }],
          max_tokens: 4000,
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        try {
          const generatedContent = JSON.parse(data.choices[0].message.content);
          updatedReactCode = generatedContent.react_code;
          updatedStyles = generatedContent.styles;
          updatedConfig = generatedContent.config || '';
        } catch (e) {
          console.warn('Failed to parse OpenAI response as JSON, keeping original content');
        }
      }
    }

    // Update the website in database
    const { data: updatedWebsite, error: updateError } = await supabase
      .from('generated_websites')
      .update({
        html_content: updatedReactCode,
        css_content: updatedStyles,
        js_content: updatedConfig,
        updated_at: new Date().toISOString(),
      })
      .eq('id', websiteId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return new Response(JSON.stringify({ website: updatedWebsite }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in website iteration:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

function getReactTemplates() {
  return {
    portfolio: {
      react_code: `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{TITLE}</h1>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Creative Professional</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I create innovative solutions that combine creativity with technical expertise to build amazing experiences.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
            View My Work
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">About Me</h3>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            I specialize in creating innovative solutions that combine creativity with technical expertise. 
            With years of experience, I help bring ideas to life through thoughtful design and development.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Project One</h4>
                <p className="text-gray-600">Description of an amazing project that showcases skills and creativity.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Project Two</h4>
                <p className="text-gray-600">Another incredible project that demonstrates technical expertise.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Project Three</h4>
                <p className="text-gray-600">A showcase of creative problem-solving and innovative thinking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h3>
          <p className="text-lg text-gray-600 mb-8">Let's collaborate on something amazing!</p>
          <a 
            href="mailto:hello@example.com" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </section>
    </div>
  );
};

export default App;`,
      styles: `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}`,
      config: `{
  "name": "portfolio-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`
    },
    
    business: {
      react_code: `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{TITLE}</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Professional Business Solutions</h2>
          <p className="text-xl mb-8 opacity-90">We help businesses grow with innovative strategies and expert guidance.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Get Started
          </button>
        </div>
      </section>

      <section id="services" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4">Consulting</h4>
              <p className="text-gray-600">Strategic business consulting to drive growth and efficiency.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4">Solutions</h4>
              <p className="text-gray-600">Custom solutions tailored to your business needs.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-4">Support</h4>
              <p className="text-gray-600">24/7 support to keep your business running smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">About Our Company</h3>
          <p className="text-lg text-gray-600">
            With years of experience, we've helped hundreds of businesses achieve their goals through innovative solutions and expert guidance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;`,
      styles: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      config: `{
  "name": "business-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`
    },

    landing: {
      react_code: `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{TITLE}</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </nav>
      </header>

      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6">The Solution You've Been Looking For</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transform your workflow with our innovative platform designed for modern professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all text-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Get results in seconds, not minutes.' },
              { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security for your data.' },
              { icon: '📈', title: 'Scalable', desc: 'Grows with your business needs.' }
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;`,
      styles: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      config: `{
  "name": "landing-page",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`
    }
  };
}>
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{TITLE}</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </nav>
      </header>

      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6">The Solution You've Been Looking For</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transform your workflow with our innovative platform designed for modern professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all text-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold mb-4">Lightning Fast</h4>
              <p className="text-gray-600">Get results in seconds, not minutes.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-4">Secure</h4>
              <p className="text-gray-600">Your data is protected with enterprise-grade security.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📈</div>
              <h4 className="text-xl font-semibold mb-4">Scalable</h4>
              <p className="text-gray-600">Grows with your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-lg text-gray-600 mb-8">Join thousands of satisfied customers today.</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all text-lg">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;`,
      styles: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      config: `{
  "name": "landing-page",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`
    }
  };
}
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">{TITLE}</div>
            <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>Professional Business Solutions</h1>
                <p>We help businesses grow with innovative strategies and expert guidance.</p>
                <button class="cta-button">Get Started</button>
            </div>
        </section>

        <section id="services">
            <h2>Our Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Consulting</h3>
                    <p>Strategic business consulting to drive growth and efficiency.</p>
                </div>
                <div class="service-card">
                    <h3>Solutions</h3>
                    <p>Custom solutions tailored to your business needs.</p>
                </div>
                <div class="service-card">
                    <h3>Support</h3>
                    <p>24/7 support to keep your business running smoothly.</p>
                </div>
            </div>
        </section>

        <section id="about">
            <h2>About Our Company</h2>
            <p>With years of experience, we've helped hundreds of businesses achieve their goals through innovative solutions and expert guidance.</p>
        </section>
    </main>

    <footer>
        <div class="footer-content">
            <p>&copy; 2025 {TITLE}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`,
      css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: #2c3e50;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

nav a:hover {
    color: #3498db;
}

main {
    margin-top: 80px;
}

.hero {
    background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
    color: white;
    padding: 8rem 2rem;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.cta-button {
    background: #e74c3c;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    margin-top: 2rem;
    transition: background 0.3s;
}

.cta-button:hover {
    background: #c0392b;
}

section {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
}

footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    nav {
        flex-direction: column;
        gap: 1rem;
    }
}`
    },

    landing: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">{TITLE}</div>
            <button class="signup-btn">Sign Up</button>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>The Solution You've Been Looking For</h1>
                <p>Transform your workflow with our innovative platform designed for modern professionals.</p>
                <div class="cta-buttons">
                    <button class="primary-btn">Start Free Trial</button>
                    <button class="secondary-btn">Learn More</button>
                </div>
            </div>
        </section>

        <section class="features">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Get results in seconds, not minutes.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure</h3>
                    <p>Your data is protected with enterprise-grade security.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">📈</div>
                    <h3>Scalable</h3>
                    <p>Grows with your business needs.</p>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers today.</p>
            <button class="final-cta">Start Your Free Trial</button>
        </section>
    </main>
</body>
</html>`,
      css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #6366f1;
}

.signup-btn {
    background: #6366f1;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
}

.signup-btn:hover {
    background: #5145cd;
}

main {
    margin-top: 80px;
}

.hero {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    padding: 8rem 2rem;
    text-align: center;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
}

.hero p {
    font-size: 1.3rem;
    margin-bottom: 3rem;
    opacity: 0.9;
}

.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.primary-btn, .secondary-btn, .final-cta {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s;
}

.primary-btn, .final-cta {
    background: white;
    color: #6366f1;
}

.primary-btn:hover, .final-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.secondary-btn {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.secondary-btn:hover {
    background: white;
    color: #6366f1;
}

.features {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.features h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
}

.feature {
    padding: 2rem;
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.cta-section {
    background: #f8fafc;
    padding: 6rem 2rem;
    text-align: center;
}

.cta-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #64748b;
}

.final-cta {
    background: #6366f1;
    color: white;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .primary-btn, .secondary-btn {
        width: 200px;
    }
}`
    }
  };
}