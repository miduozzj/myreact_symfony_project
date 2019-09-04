<?php

namespace App\Repository;

use App\Entity\Mytable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Mytable|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mytable|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mytable[]    findAll()
 * @method Mytable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MytableRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Mytable::class);
    }

    // /**
    //  * @return Mytable[] Returns an array of Mytable objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Mytable
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function add($parms){
        $list = new Mytable();
        $list
            ->setName($parms["name"])
            ->setDes($parms["des"])
            ->setUrl($parms["url"]);
        $em = $this->getEntityManager();
        $em->persist($list);
        $em->flush();
    }
}
