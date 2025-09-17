import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              Welcome to Cyblick! These Terms of Service ("Terms") govern your use of the Cyblick 
              platform and services ("Service") operated by Cyblick ("we," "us," or "our").
            </p>
            <p className="text-muted-foreground">
              By accessing or using our Service, you agree to be bound by these Terms. If you 
              disagree with any part of these terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Cyblick is an AI-powered platform that generates professional websites based on 
              user prompts and requests. Our Service includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>AI website generation using natural language processing</li>
              <li>Token-based pricing system for fair usage billing</li>
              <li>Website editing and iteration capabilities</li>
              <li>Export functionality for generated websites</li>
              <li>User dashboard and account management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Account Creation</h3>
            <p className="text-muted-foreground mb-4">
              To use Cyblick, you must create an account by providing accurate and complete 
              information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and up-to-date account information</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Account Eligibility</h3>
            <p className="text-muted-foreground">
              You must be at least 18 years old or have parental consent to use Cyblick. 
              By creating an account, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Token System and Pricing</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Token Usage</h3>
            <p className="text-muted-foreground mb-4">
              Cyblick operates on a token-based system where different actions consume tokens:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Website Generation:</strong> 25 tokens per website</li>
              <li><strong>Website Iteration:</strong> 15 tokens per modification</li>
              <li><strong>Live Editing:</strong> 5 tokens per edit session</li>
              <li><strong>Website Export:</strong> 10 tokens per export</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Subscription Plans</h3>
            <div className="bg-card p-6 rounded-lg border mb-4">
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Free Plan:</strong> 100 tokens/month (~4 websites)</li>
                <li><strong>Pro Plan:</strong> $9.99/month, 500 tokens (~20 websites)</li>
                <li><strong>Premium Plan:</strong> $24.99/month, 1,500 tokens (~60 websites)</li>
                <li><strong>Enterprise Plan:</strong> $99.99/month, 10,000 tokens (~400 websites)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">Token Policies</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Unused tokens may roll over up to plan-specific limits</li>
              <li>Tokens reset monthly on your billing date</li>
              <li>No refunds for unused tokens upon account termination</li>
              <li>Token costs may be adjusted with 30-day notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Acceptable Use</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Permitted Uses</h3>
            <p className="text-muted-foreground mb-4">
              You may use Cyblick to create legitimate websites for personal, business, or 
              commercial purposes in compliance with applicable laws.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Prohibited Uses</h3>
            <p className="text-muted-foreground mb-4">You agree not to use Cyblick to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Create websites with illegal, harmful, or offensive content</li>
              <li>Generate content that violates intellectual property rights</li>
              <li>Create websites for phishing, fraud, or malicious purposes</li>
              <li>Distribute malware, viruses, or harmful code</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to reverse engineer or compromise our Service</li>
              <li>Abuse our system or attempt to bypass token limitations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Your Content</h3>
            <p className="text-muted-foreground mb-4">
              You retain ownership of websites and content you create using Cyblick. By using 
              our Service, you grant us a limited license to process your content for the 
              purpose of providing our Service.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Our Platform</h3>
            <p className="text-muted-foreground mb-4">
              Cyblick and its underlying technology, including our AI models, algorithms, and 
              platform, are our proprietary property. You may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Copy, modify, or distribute our platform</li>
              <li>Reverse engineer our AI technology</li>
              <li>Use our platform to create competing services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Privacy and Data</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information. By using Cyblick, you agree 
              to our data practices as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Service Availability</h2>
            <p className="text-muted-foreground mb-4">
              While we strive for high availability, we cannot guarantee that Cyblick will be 
              available 24/7. We may experience downtime for maintenance, updates, or 
              unforeseen technical issues.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to modify or discontinue any part of our Service with 
              reasonable notice to users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, Cyblick shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages resulting from 
              your use of our Service. Our total liability shall not exceed the amount you 
              paid for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Termination</h2>
            <p className="text-muted-foreground mb-4">
              Either party may terminate these Terms at any time:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>You</strong> may cancel your account at any time through your dashboard</li>
              <li><strong>We</strong> may terminate accounts for violations of these Terms</li>
              <li>Upon termination, your access will cease and data may be deleted per our retention policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Dispute Resolution</h2>
            <p className="text-muted-foreground">
              Any disputes arising from these Terms shall be resolved through binding arbitration 
              in accordance with the rules of the American Arbitration Association. The arbitration 
              shall take place in [Your Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of 
              material changes via email or platform notification. Continued use of the Service 
              after changes constitute acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-foreground font-semibold mb-2">Cyblick Legal Team</p>
              <p className="text-muted-foreground">Email: legal@cyblick.com</p>
              <p className="text-muted-foreground">Address: [Your Business Address]</p>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;