
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Grade Compass</h1>
        
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                Grade Compass aims to empower Santa Monica College students to make informed decisions
                about their education by providing transparent, data-driven insights about courses and professors.
              </p>
              <p className="text-lg">
                We believe that access to grade distribution data and peer reviews creates a more transparent
                academic environment, helping students select courses that align with their learning styles and
                academic goals.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Professor Reviews</h3>
                <p>
                  Read and submit anonymous reviews of professors, including ratings for overall quality,
                  difficulty, and engagement. Share your experiences to help other students.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Grade Distributions</h3>
                <p>
                  View historical grade distributions for courses with specific professors. Understand the 
                  grading patterns and calculate expected GPA based on actual data.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Course Information</h3>
                <p>
                  Access comprehensive information about courses, including which professors teach them,
                  department affiliation, and unit count.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">User Contributions</h3>
                <p>
                  Contribute your own experiences through reviews and ratings to help build a comprehensive
                  resource for the SMC student community.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
              <p className="mb-4">
                Grade distribution data comes from publicly available Santa Monica College records.
                This information is published each semester and made available to the public in
                accordance with academic transparency policies.
              </p>
              <p className="mb-4">
                Professor and course reviews are submitted by authenticated users who have taken
                classes at the college. While we do not verify enrollment in specific courses,
                we employ moderation techniques to ensure the quality and authenticity of reviews.
              </p>
              <p>
                Grade Compass is not affiliated with Santa Monica College administration and represents
                an independent resource created by and for students.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Privacy & Ethics</h2>
              <p className="mb-4">
                Grade Compass is committed to maintaining student privacy and adhering to educational
                data ethics. We do not collect or display any personally identifiable student information.
              </p>
              <p className="mb-4">
                All user reviews are anonymous by default, though users may optionally include a username.
                We moderate content to ensure it meets our community guidelines and focuses on academic
                experiences rather than personal attacks.
              </p>
              <p>
                For more information about our data practices, please see our Privacy Policy and Terms of Service.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
