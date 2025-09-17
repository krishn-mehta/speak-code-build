import { Card } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      company: "TechFlow",
      avatar: "SC",
      testimonial: "Cyblick helped me launch my startup's website in under 30 minutes. The React code it generated was production-ready and saved me weeks of development time."
    },
    {
      name: "Marcus Rodriguez",
      role: "Freelance Designer", 
      company: "Design Studio",
      avatar: "MR",
      testimonial: "I've built 20+ client websites with Cyblick. The token system is perfect for my business - I only pay for what I use, and clients love the quick turnaround."
    },
    {
      name: "Emily Thompson",
      role: "Marketing Manager",
      company: "GrowthCorp", 
      avatar: "ET",
      testimonial: "Our marketing team can now create landing pages independently without waiting for developers. Cyblick has transformed our workflow completely."
    },
    {
      name: "David Park",
      role: "Product Manager",
      company: "InnovateX",
      avatar: "DP", 
      testimonial: "The quality of React components Cyblick generates is impressive. We use it for rapid prototyping and our developers are amazed by the clean code."
    },
    {
      name: "Lisa Wang",
      role: "Agency Owner",
      company: "Digital Solutions",
      avatar: "LW",
      testimonial: "Cyblick has 10x'd our agency's output. We can now handle more clients while maintaining quality. The token pricing makes it profitable for every project size."
    },
    {
      name: "Alex Johnson",
      role: "E-commerce Owner",
      company: "ShopSmart",
      avatar: "AJ",
      testimonial: "From concept to deployed website in minutes, not weeks. Cyblick helped me launch my e-commerce site and start generating revenue immediately."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Thousands of Creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to agencies, see how Cyblick is transforming web development for teams worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.testimonial}"
              </p>
              <div className="flex mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-subtle rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Websites Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">12,000+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;